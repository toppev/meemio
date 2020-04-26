package dev.toppe.meemio.model

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import java.util.*
import javax.persistence.*

@Entity
class Post(

        @ManyToOne
        @JoinColumn(nullable = false)
        @JsonIgnore
        var user: User,

        /**
         * The unique id of this post
         */
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

        /**
         * The title of this post
         */
        var title: String = "",

        // Only count likes and dislikes here
        // The User entity has their likes and dislikes
        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        var likes: Int = 0,

        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        var dislikes: Int = 0,

        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        var created: Date = Date(Calendar.getInstance().time.time),

        @ManyToOne
        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        var media: Media? = null
) {
    /**
     * Username of the post owner
     */
    @JsonProperty(value = "username")
    fun getUsername() = user.username

    /**
     * Id of the post owner
     */
    @JsonProperty(value = "userId")
    fun getUserId() = user.id
}