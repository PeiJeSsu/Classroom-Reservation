package com.example.approvalapplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.approvalapplication.ClassroomRequest;
public interface ClassroomRequestRepository extends MongoRepository<ClassroomRequest, String> {
}