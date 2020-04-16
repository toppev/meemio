package dev.toppe.meemio.repository

import dev.toppe.meemio.model.User
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource

@RepositoryRestResource
interface UserRepository : PagingAndSortingRepository<User, Long> {

    fun findByUsername(username: String): User?


    // Don't export with Spring Data Rest:
    @RestResource(exported = false)
    override fun deleteAll()

    @RestResource(exported = false)
    override fun delete(entity: User)

    @RestResource(exported = false)
    override fun deleteById(id: Long)

    @RestResource(exported = false)
    override fun <S : User?> save(entity: S): S

    @RestResource(exported = false)
    override fun <S : User?> saveAll(entities: MutableIterable<S>): MutableIterable<S>

    @RestResource(exported = false)
    override fun deleteAll(entities: MutableIterable<User>)
}