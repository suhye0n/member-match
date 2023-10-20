package com.todo.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.todo.server.model.NotificationEntity;
import com.todo.server.persistence.NotificationRepository;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationEntity> getAllNotifications() {
        return notificationRepository.findAll();
    }
    
    public List<NotificationEntity> getNotificationsByUsername(String username) {
        return notificationRepository.findByUsername(username);
    }

    public NotificationEntity createNotification(NotificationEntity notification) {
        return notificationRepository.save(notification);
    }

    public NotificationEntity markNotificationAsRead(long notificationId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
            .orElseThrow();
        
        notification.setRead(true);

        return notificationRepository.save(notification);
    }

    public void deleteNotification(long notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
