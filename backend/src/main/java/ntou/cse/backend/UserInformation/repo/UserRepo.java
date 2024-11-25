package ntou.cse.backend.UserInformation.repo;

import ntou.cse.backend.UserInformation.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User, String> {
    User findByEmail(String email);
}
