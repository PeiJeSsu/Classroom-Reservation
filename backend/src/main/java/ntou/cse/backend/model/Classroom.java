package ntou.cse.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "classrooms")
public class Classroom {
    @Id
    private String id;
    private String floor;
    private String roomNumber;

    public Classroom() {}

    public String getId() {
        return id;
    }

    public String getFloor() {
        return floor;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    @Override
    public String toString() {
        return "Classroom{" +
                "id='" + id + '\'' +
                ", floor='" + floor + '\'' +
                ", roomNumber='" + roomNumber + '\'' +
                '}';
    }
}

