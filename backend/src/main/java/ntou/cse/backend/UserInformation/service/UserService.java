package ntou.cse.backend.UserInformation.service;

import ntou.cse.backend.UserInformation.model.User;
import ntou.cse.backend.UserInformation.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

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
        // 過濾角色為 borrower 的用戶
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
            return true;
        }
        return false;
    }

    public boolean unbanUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setIsBanned(false);
            user.setUnbanTime(null); // 清除解禁時間
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public void updateAllUsersUnBanned() {  // 用來初始化的
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
        // System.out.println("Testing");
        for (User user : bannedUsers) {
            if (user.getUnbanTime() != null && user.getUnbanTime().isBefore(now)) {
                user.setIsBanned(false);
                user.setUnbanTime(null);
                userRepository.save(user);
                System.out.println("User " + user.getEmail() + " has been unbanned.");
            }
        }
    }
}
