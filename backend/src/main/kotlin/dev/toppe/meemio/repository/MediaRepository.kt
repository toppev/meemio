package dev.toppe.meemio.repository

import dev.toppe.meemio.model.Media
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.stereotype.Repository

@Repository
@RepositoryRestResource(exported = false)
interface MediaRepository : CrudRepository<Media, Long>