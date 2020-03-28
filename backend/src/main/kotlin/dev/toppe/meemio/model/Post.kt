package dev.toppe.meemio.model

import com.fasterxml.jackson.annotation.JsonProperty
import javax.persistence.*

@Entity
class Post(

        @ManyToOne(cascade = [CascadeType.MERGE])
        @JoinColumn(nullable = false)
        val user: User,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

        // Only count likes and dislikes here
        // The User entity has their likes and dislikes
        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        var likes: Int = 0,

        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        var dislikes: Int = 0
)