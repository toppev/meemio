package dev.toppe.meemio.model

import com.fasterxml.jackson.annotation.JsonProperty
import javax.persistence.*

@Entity
data class User(
        @Column(nullable = false)
        val username: String,

        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        @Column(nullable = false)
        val password: String,

        @Enumerated(EnumType.STRING)
        @ElementCollection(targetClass = Role::class)
        val roles: MutableSet<Role> = mutableSetOf(Role.USER),

        @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
        val posts: MutableSet<Post> = mutableSetOf(),

        /**
         * Users following this user
         */
        @ManyToMany
        @JoinTable(
                joinColumns = [JoinColumn(name = "userId")],
                inverseJoinColumns = [JoinColumn(name = "followerId")]
        )
        val followers: MutableSet<User> = mutableSetOf(),

        /**
         * Users this user is following
         */
        @ManyToMany
        @JoinTable(
                joinColumns = [JoinColumn(name = "followerId")],
                inverseJoinColumns = [JoinColumn(name = "userId")]
        )
        val following: MutableSet<User> = mutableSetOf(),

        @ManyToMany(mappedBy = "liked")
        var likedPosts: MutableSet<Post> = mutableSetOf(),

        @ManyToMany(mappedBy = "disliked")
        var dislikedPosts: MutableSet<Post> = mutableSetOf(),

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
)