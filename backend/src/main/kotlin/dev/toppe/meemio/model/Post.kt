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

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

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
    @JsonProperty(value = "username")
    fun getUsername() = user.username

    @JsonProperty(value = "userId")
    fun getUserId() = user.id
}