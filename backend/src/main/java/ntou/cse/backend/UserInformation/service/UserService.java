package ntou.cse.backend.UserInformation.service;

import ntou.cse.backend.UserInformation.model.User;
import ntou.cse.backend.UserInformation.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    public User createUser(String email, String role) {
        User user = new User();
        user.setEmail(email);
        user.setRole(role);

        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
