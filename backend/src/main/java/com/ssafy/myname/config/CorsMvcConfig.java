//package com.ssafy.myname.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import java.util.List;
//
//@Configuration
//public class CorsMvcConfig implements WebMvcConfigurer {
//
////    @Override
////    public void addCorsMappings(CorsRegistry registry) {
////        registry.addMapping("/**")
////                .allowedOrigins(List.of("http://localhost:3000", "http://localhost:8081",
////                        "https://i10c207.p.ssafy.io", "https://mynameis.site"));
////    }
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000", "http://localhost:8081",
//                        "https://i10c207.p.ssafy.io", "https://mynameis.site")
//                .allowedMethods("*")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }
//}
