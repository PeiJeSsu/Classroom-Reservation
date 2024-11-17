package ntou.cse.backend.ClassroomApply.model;

import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "classrooms_apply")
public class ClassroomApply {
    private String id;
    private String floor;
    private String classroom;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean isApproved;

    public ClassroomApply() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public String getClassroom() {
        return classroom;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    @Override
    public String toString() {
        return "ClassroomApply{" +
                "id='" + id + '\'' +
                ", floor='" + floor + '\'' +
                ", classroom='" + classroom + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", isApproved=" + isApproved +
                '}';
    }
}
