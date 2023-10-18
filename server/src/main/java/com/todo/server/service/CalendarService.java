package com.todo.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.server.model.CalendarEntity;
import com.todo.server.persistence.CalendarRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CalendarService {
    @Autowired
    private CalendarRepository calendarEventRepository;

    public CalendarEntity createCalendarEvent(CalendarEntity calendarEvent) {
        return calendarEventRepository.save(calendarEvent);
    }

    public List<CalendarEntity> getCalendarEventsByProjectKey(String projectKey) {
        return calendarEventRepository.findByProjectKey(projectKey);
    }

    public Optional<CalendarEntity> getCalendarEventById(Long id) {
        return calendarEventRepository.findById(id);
    }

    public CalendarEntity updateCalendarEvent(Long id, CalendarEntity updatedEvent) {
        if (calendarEventRepository.existsById(id)) {
            updatedEvent.setId(id);
            return calendarEventRepository.save(updatedEvent);
        } else {
            return null;
        }
    }

    public void deleteCalendarEvent(Long id) {
        calendarEventRepository.deleteById(id);
    }
}
