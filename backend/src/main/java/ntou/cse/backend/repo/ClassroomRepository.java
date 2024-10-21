package ntou.cse.backend.repo;

import ntou.cse.backend.model.Classroom;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ClassroomRepository extends MongoRepository<Classroom, String> {
    Optional<Classroom> findByFloorAndRoomNumber(String floor, String roomNumber);
}
