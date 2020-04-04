package dev.toppe.meemio.service

import dev.toppe.meemio.model.User
import dev.toppe.meemio.repository.UserRepository
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import javax.transaction.Transactional

import org.springframework.security.core.userdetails.User as SimpleUserDetails

@Service
class UserDetailsServiceImpl(private val userRepository: UserRepository) : UserDetailsService {

    @Transactional
    override fun loadUserByUsername(username: String): UserDetails {
        val user: User = userRepository.findByUsername(username) ?: throw UsernameNotFoundException(username)
        val authorities = user.roles.map { SimpleGrantedAuthority(it.name) }
        return CurrentUser(user.username, user.password, authorities, user)
    }
}

/**
 * Adds user field to org.springframework.security.core.userdetails.User
 *
 */
class CurrentUser(
        username: String?,
        password: String?,
        authorities: List<SimpleGrantedAuthority>,
        /** Warning: lazy attributes may not work well */
        val user: User
) : SimpleUserDetails(username, password, authorities)


/** Warning: lazy attributes may not work well */
fun getCurrentUser() = (SecurityContextHolder.getContext().authentication.principal as CurrentUser).user