package com.example.approvalapplication;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "classroom_requests")
public class ClassroomRequest {

    @Id
    private String id;
    private String studentName;
    private String classroom;
    private String date;
    private boolean isApproved;

    public ClassroomRequest() {}

    public ClassroomRequest(String studentName, String classroom, String date) {
        this.studentName = studentName;
        this.classroom = classroom;
        this.date = date;
        this.isApproved = false; // 預設不通過
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }
}
