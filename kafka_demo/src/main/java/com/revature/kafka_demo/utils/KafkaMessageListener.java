package com.revature.kafka_demo.utils;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaMessageListener {

    @KafkaListener(topics = "demoTopic", groupId = "demoGroup")
    public void listener(String message) {
        System.out.println("Received message: " + message);
    }
}