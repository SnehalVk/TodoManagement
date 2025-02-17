package com.todoapp.rest.basic.auth;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Below is a Controller
@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BasicAuthenticationController {
	
	//GET
	//URI -/hello-world
	//method - "Hello World"
	//@RequestMapping(method=RequestMethod.GET, path="/hello-world")
	
	@GetMapping(path="/basicauth")
		public AuthenticationBean helloWorldBean(){
		return new AuthenticationBean("You are authenticated");
	}
	
}
