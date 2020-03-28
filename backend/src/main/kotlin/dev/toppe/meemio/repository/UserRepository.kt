package dev.toppe.meemio.repository

import dev.toppe.meemio.model.User
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.security.access.prepost.PreAuthorize

@PreAuthorize("hasRole('ROLE_USER')")
@RepositoryRestResource(collectionResourceRel = "users", path = "users")
interface UserRepository : PagingAndSortingRepository<User, Long> {

    @PreAuthorize("#entity.id == authentication.principal.user.id")
    override fun delete(entity: User)

    @PreAuthorize("#entity.id == authentication.principal.user.id")
    override fun <S : User?> save(entity: S): S

    fun findByUsername(username: String): User?


}