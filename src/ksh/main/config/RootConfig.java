package ksh.main.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan({ "ksh.main.controllers" })
@Import({SecurityConfig.class})
public class RootConfig {

}
