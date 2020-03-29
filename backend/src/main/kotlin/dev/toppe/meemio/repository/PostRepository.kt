package dev.toppe.meemio.repository

import dev.toppe.meemio.model.Post
import dev.toppe.meemio.model.User
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.security.access.prepost.PreAuthorize
import java.util.*
import java.util.concurrent.TimeUnit


@PreAuthorize("hasRole('ROLE_USER')")
@RepositoryRestResource(collectionResourceRel = "posts", path = "posts")
interface PostRepository : PagingAndSortingRepository<Post, Long> {

    @PreAuthorize("@postService.isPostOwner(#entity, authentication.principal.user)")
    override fun delete(entity: Post)

    @PreAuthorize("@postService.isPostOwner(#entity, authentication.principal.user)")
    override fun <S : Post?> save(entity: S): S

    /**
     * @param ids the post ids to exclude. Should not be empty (might break it), instead use -1
     */
    // TODO: use @Query?
    fun findTop10ByCreatedAfterAndIdNotInOrderByLikesDescCreatedDesc(created: Date = twoWeeksAgo(), ids: List<Long>): List<Post>

    private fun twoWeeksAgo() = Date(Calendar.getInstance().time.time - TimeUnit.DAYS.toMillis(14))

    /**
     * @param users the post owners. Should not be empty (might break it), instead use -1
     * @param ids the post ids to exclude. Should not be empty (might break it), instead use -1
     */
    // TODO: use @Query?
    fun findTop10ByUserInAndIdNotInOrderByLikesDescCreatedDesc(users: List<User>, ids: List<Long>): List<Post>

}