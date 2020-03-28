package dev.toppe.meemio.config

import dev.toppe.meemio.service.UserDetailsServiceImpl
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler


@Configuration
@EnableWebSecurity
class SecurityConfiguration(private val userDetailsService: UserDetailsServiceImpl) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        http.authorizeRequests().anyRequest()
                .authenticated()
                .and()
                .formLogin()
                .permitAll()
                // Respond with 401 Unauthorized
                // No redirects
                .failureHandler(SimpleUrlAuthenticationFailureHandler())
                .and()
                .rememberMe()
                .alwaysRemember(true)
                // Remember for 2 weeks (default)
                //.tokenValiditySeconds()
                .and()
                .csrf().disable()
    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder())
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}