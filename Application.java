// package com._5guys;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.scheduling.annotation.EnableScheduling;

// @SpringBootApplication
// @EnableScheduling // Enable scheduling
// public class PharmacyManagementApplication {
//     public static void main(String[] args) {
//         SpringApplication.run(PharmacyManagementApplication.class, args);
//     }
// }


package com._5guys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com._5guys")
@EntityScan(basePackages = "com._5guys")
@EnableJpaRepositories(basePackages = "com._5guys")
@EnableScheduling // Enable scheduling
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}
