package dev.toppe.meemio.repository

import dev.toppe.meemio.model.Post
import dev.toppe.meemio.model.User
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.stereotype.Repository
import java.util.*
import java.util.concurrent.TimeUnit


@Repository
@RepositoryRestResource(exported = false)
interface PostRepository : PagingAndSortingRepository<Post, Long> {

    override fun findById(id: Long): Optional<Post>

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