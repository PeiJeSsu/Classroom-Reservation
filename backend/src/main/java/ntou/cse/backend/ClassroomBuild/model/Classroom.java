package ntou.cse.backend.ClassroomBuild.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "classrooms")
public class Classroom {
    @Id
    private String id;
    private String floor;
    private String roomNumber;
    private KeyStatus keyStatus;
    private String borrower ;
    private String borrowerRole;

    public enum KeyStatus {
        BORROWED,
        AVAILABLE,
        LOST
    }

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

    public KeyStatus getKeyStatus() {return keyStatus;}

    public String getBorrower() {return borrower;}

    public String getBorrowerRole() {return borrowerRole;}

    public void setId(String id) {
        this.id = id;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public void setKeyStatus(KeyStatus keyStatus) {this.keyStatus = keyStatus;}

    public void setBorrower(String borrower) {this.borrower = borrower;}

    public void setBorrowerRole(String borrowerRole) {this.borrowerRole = borrowerRole;}

    @Override
    public String toString() {
        return "Classroom{" +
                "id='" + id + '\'' +
                ", floor='" + floor + '\'' +
                ", roomNumber='" + roomNumber + '\'' +
                ", keyStatus=" + keyStatus + '\'' +
                ", borrower='" + borrower + '\'' +
                ", borrowerRole='" + borrowerRole + '\'' +
                '}';
    }
}

