package ntou.cse.backend.Login.service;

import ntou.cse.backend.Login.model.User;
import ntou.cse.backend.Login.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        userRepository.save(user);
    }

    public void authenticateUser(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isEmpty() || !existingUser.get().getPassword().equals(user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }
    }
}
