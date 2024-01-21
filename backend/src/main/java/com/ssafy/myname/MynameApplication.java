package com.ssafy.myname;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.logging.Logger;

@SpringBootApplication
public class MynameApplication {

	private static final Logger logger = Logger.getLogger(MynameApplication.class.getName());
	public static void main(String[] args) {
		SpringApplication.run(MynameApplication.class, args);
	}

}
