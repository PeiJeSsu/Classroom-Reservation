package ntou.cse.backend.ClassroomApply.repo;

import ntou.cse.backend.ClassroomApply.model.ClassroomApply;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassroomApplyRepository extends MongoRepository<ClassroomApply, String> {
}
