package dev.toppe.meemio.repository

import dev.toppe.meemio.model.Post
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.security.access.prepost.PreAuthorize

@PreAuthorize("hasRole('ROLE_USER')")
@RepositoryRestResource(collectionResourceRel = "posts", path = "posts")
interface PostRepository : PagingAndSortingRepository<Post, Long> {

    @PreAuthorize("@postService.isPostOwner(#entity, authentication.principal.user)")
    override fun delete(entity: Post)

    @PreAuthorize("!@postService.existsById(#entity)")
    override fun <S : Post?> save(entity: S): S

}