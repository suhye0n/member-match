package com.todo.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.todo.server.service.CalendarService;
import com.todo.server.model.CalendarEntity;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/calendar")
public class CalendarController {
    private final CalendarService calendarService;

    @Autowired
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @PostMapping("/create")
    public ResponseEntity<CalendarEntity> createCalendarEvent(@RequestBody CalendarEntity calendarEvent) {
        CalendarEntity createdEvent = calendarService.createCalendarEvent(calendarEvent);
        return ResponseEntity.ok(createdEvent);
    }

    @GetMapping("/project/{projectKey}")
    public ResponseEntity<List<CalendarEntity>> getCalendarEventsByProjectKey(@PathVariable String projectKey) {
        List<CalendarEntity> calendarEvents = calendarService.getCalendarEventsByProjectKey(projectKey);
        return ResponseEntity.ok(calendarEvents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalendarEntity> getCalendarEventById(@PathVariable Long id) {
        Optional<CalendarEntity> calendarEvent = calendarService.getCalendarEventById(id);
        if (calendarEvent.isPresent()) {
            return ResponseEntity.ok(calendarEvent.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CalendarEntity> updateCalendarEvent(@PathVariable Long id, @RequestBody CalendarEntity updatedEvent) {
        CalendarEntity updatedCalendarEvent = calendarService.updateCalendarEvent(id, updatedEvent);
        return ResponseEntity.ok(updatedCalendarEvent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalendarEvent(@PathVariable Long id) {
        calendarService.deleteCalendarEvent(id);
        return ResponseEntity.noContent().build();
    }
}
