package com.social;

import com.social.dao.UserRepository;
import com.social.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 
 * @author kamal berriga
 *
 */
@SpringBootApplication
public class SpringBootSocialAuthApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSocialAuthApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		userRepository.save(new User("piotrkosinski1992@o2.pl",passwordEncoder.encode("111"),"Piotr Kosinski", "USER"));
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
