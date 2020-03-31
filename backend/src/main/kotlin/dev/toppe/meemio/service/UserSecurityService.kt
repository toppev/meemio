package dev.toppe.meemio.service

import dev.toppe.meemio.model.User
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Service

@Service
class UserSecurityService {


    fun canSave(user: User): Boolean {
        println(user.id)
        return true
    }

    @PreAuthorize("hasRole('ADMIN')")
    fun canDelete(user: User): Boolean {
        return true
    }


}