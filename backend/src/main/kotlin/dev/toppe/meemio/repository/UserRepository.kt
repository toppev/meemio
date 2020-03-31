package dev.toppe.meemio.repository

import dev.toppe.meemio.model.User
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource
import java.util.*

@RepositoryRestResource
interface UserRepository : PagingAndSortingRepository<User, Long> {

    @RestResource
    override fun findById(id: Long): Optional<User>

    fun findByUsername(username: String): User?

}