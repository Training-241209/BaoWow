package com.revature.kafka_demo.controllers;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.kafka_demo.dtos.requests.MessageRequest;

@RestController
@RequestMapping("/api/message")
public class KafkaMessageController {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public KafkaMessageController(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @PostMapping
    public void publish(@RequestBody MessageRequest req) {
        kafkaTemplate.send("demoTopic", req.message());
    }
}
