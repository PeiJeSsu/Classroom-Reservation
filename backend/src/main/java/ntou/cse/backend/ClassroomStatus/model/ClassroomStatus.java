package ntou.cse.backend.ClassroomStatus.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "classrooms_status")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClassroomStatus {
    private String id;
    private String floor;
    private String classroom;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;

    public ClassroomStatus() {}

    public String getId() {return id;}

    public void setId(String id) {this.id = id;}

    public String getFloor() {return floor;}

    public void setFloor(String floor) {this.floor = floor;}

    public String getClassroom() {return classroom;}

    public void setClassroom(String classroom) {this.classroom = classroom;}

    public LocalDateTime getStartTime() {return startTime;}

    public void setStartTime(LocalDateTime startTime) {this.startTime = startTime;}

    public LocalDateTime getEndTime() {return endTime;}

    public void setEndTime(LocalDateTime endTime) {this.endTime = endTime;}

    public String getStatus() {return status;}

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ClassroomStatus{" +
                "id='" + id + '\'' +
                ", floor='" + floor + '\'' +
                ", classroom='" + classroom + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", status='" + status + '\'' +
                '}';
    }
}