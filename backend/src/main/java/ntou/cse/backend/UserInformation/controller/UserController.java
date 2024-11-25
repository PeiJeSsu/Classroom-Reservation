package ntou.cse.backend.UserInformation.controller;

import ntou.cse.backend.UserInformation.model.User;
import ntou.cse.backend.UserInformation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            userService.createUser(user.getEmail(), user.getRole());
            return ResponseEntity.ok("註冊成功");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("註冊失敗：" + e.getMessage());
        }
    }

    // New endpoint to fetch the user's role by email
    @PostMapping("/role")
    public ResponseEntity<?> getUserRole(@RequestBody User user) {
        try {
            // Fetch user by email
            User foundUser = userService.getUserByEmail(user.getEmail());

            if (foundUser == null) {
                return ResponseEntity.status(404).body("User not found");
            }

            // Return the role of the user
            return ResponseEntity.ok().body(foundUser.getRole());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving user role: " + e.getMessage());
        }
    }
}
