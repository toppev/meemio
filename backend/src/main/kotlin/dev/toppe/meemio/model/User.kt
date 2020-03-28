package dev.toppe.meemio.model

import com.fasterxml.jackson.annotation.JsonProperty
import javax.persistence.*

@Entity
class User(
        @Column(nullable = false)
        val username: String,

        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        @Column(nullable = false)
        val password: String = "",

        @Column(updatable = false) // can not be updated
        @JsonProperty(access = JsonProperty.Access.READ_ONLY) // just to be sure
        @Enumerated(EnumType.STRING)
        @ElementCollection(targetClass = Role::class)
        val roles: MutableSet<Role> = mutableSetOf(Role.USER),

        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        @OneToMany(mappedBy = "user", orphanRemoval = true)
        val posts: MutableSet<Post> = mutableSetOf(),

        /**
         * Users following this user
         */
        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(
                joinColumns = [JoinColumn(name = "userId")],
                inverseJoinColumns = [JoinColumn(name = "followerId")]
        )
        val followers: MutableSet<User> = mutableSetOf(),

        /**
         * Users this user is following
         */
        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(
                joinColumns = [JoinColumn(name = "followerId")],
                inverseJoinColumns = [JoinColumn(name = "userId")]
        )
        val following: MutableSet<User> = mutableSetOf(),

        @ElementCollection(fetch = FetchType.LAZY)
        var notifications: MutableList<Notification> = mutableListOf(),

        @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
        var likedPosts: MutableSet<Post> = mutableSetOf(),

        @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
        var dislikedPosts: MutableSet<Post> = mutableSetOf(),

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
)