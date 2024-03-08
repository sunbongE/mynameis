package com.ssafy.myname;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.logging.Logger;


@EnableAsync
@SpringBootApplication
public class MynameApplication {
	private static final Logger logger = Logger.getLogger(MynameApplication.class.getName());
	public static void main(String[] args) {
		SpringApplication.run(MynameApplication.class, args);
	}

}
