package ntou.cse.backend.UserInformation.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import ntou.cse.backend.UserInformation.model.User;
import ntou.cse.backend.UserInformation.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@EnableAsync
public class UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public User createUser(String email, String role) {
        User user = new User();
        user.setEmail(email);
        user.setRole(role);
        user.setIsBanned(false);
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getBorrowers() {
        // 过滤角色为 borrower 的用户
        return userRepository.findAll().stream()
                .filter(user -> "borrower".equals(user.getRole()))
                .collect(Collectors.toList());
    }

    public boolean banUser(String email, int lastTimeInSeconds) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setIsBanned(true);
            LocalDateTime unbanTime = LocalDateTime.now().plusSeconds(lastTimeInSeconds);
            user.setUnbanTime(unbanTime);
            userRepository.save(user);

            String emailText = String.format(
                    "Dear user,\n\nYour account has been banned until %s.\n\n" +
                            "If you believe this is a mistake, please contact support.\n\n" +
                            "Best regards,\nSystem Administrator",
                    unbanTime.toString()
            );

            // 使用異步發送郵件
            sendEmailAsync(email, "Account Banned", emailText);
            return true;
        }
        return false;
    }

    public boolean unbanUser(String email) {
        System.out.println("Here");
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setIsBanned(false);
            user.setUnbanTime(null);
            userRepository.save(user);

            String emailText = "Dear user,\n\n" +
                    "Your account has been unbanned. You can now access all features again.\n\n" +
                    "Best regards,\nSystem Administrator";

            sendEmailAsync(email, "Account Unbanned", emailText);  // 異步發送
            return true;
        }
        return false;
    }

    public void updateAllUsersUnBanned() {  // 用来初始化的
        List<User> allUsers = userRepository.findAll();
        for (User user : allUsers) {
            user.setIsBanned(false);
        }
        userRepository.saveAll(allUsers);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Scheduled(fixedRate = 1000) // 1秒一次
    public void checkUnbanUsers() {
        LocalDateTime now = LocalDateTime.now();
        List<User> bannedUsers = userRepository.findByIsBannedTrue();
        System.out.println(now);
        for (User user : bannedUsers) {
            System.out.println(user.getEmail() + " " + (user.getUnbanTime() != null) + " " + (user.getUnbanTime().isBefore(now)));
            if (user.getUnbanTime() != null && user.getUnbanTime().isBefore(now)) {
                System.out.println("In" + user.getEmail());
                unbanUser(user.getEmail());
            }
        }
        System.out.println("---");
    }

    @Async
    public CompletableFuture<Void> sendEmailAsync(String to, String subject, String text) {
        return CompletableFuture.runAsync(() -> {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                helper.setFrom(new InternetAddress(fromEmail));
                helper.setTo(new InternetAddress(to));
                helper.setSubject(subject);
                helper.setText(text, true);

                mailSender.send(message);
            } catch (MessagingException e) {
                System.err.println("Failed to send email to " + to + ": " + e.getMessage());
            }
        });
    }
}
