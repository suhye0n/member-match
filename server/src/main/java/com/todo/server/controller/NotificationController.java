package com.todo.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.todo.server.model.NotificationEntity;
import com.todo.server.service.NotificationService;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<NotificationEntity>> getAllNotifications() {
        List<NotificationEntity> notifications = notificationService.getAllNotifications();
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<NotificationEntity>> getNotificationsByUsername(@PathVariable String username) {
        List<NotificationEntity> notifications = notificationService.getNotificationsByUsername(username);
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<NotificationEntity> createNotification(@RequestBody NotificationEntity notification) {
        NotificationEntity createdNotification = notificationService.createNotification(notification);
        return ResponseEntity.ok(createdNotification);
    }

    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<NotificationEntity> markNotificationAsRead(@PathVariable long notificationId) {
        NotificationEntity markedAsRead = notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok(markedAsRead);
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable long notificationId) {
        notificationService.deleteNotification(notificationId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
