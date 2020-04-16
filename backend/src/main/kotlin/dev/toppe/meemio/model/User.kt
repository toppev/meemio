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

        @JsonProperty(access = JsonProperty.Access.READ_ONLY)
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
        @ManyToMany(mappedBy = "following", cascade = [CascadeType.ALL])
        val followers: MutableSet<User> = mutableSetOf(),

        /**
         * Users this user is following
         */
        @ManyToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
        @JoinTable(
                joinColumns = [JoinColumn(name = "followerId")],
                inverseJoinColumns = [JoinColumn(name = "userId")]
        )
        val following: MutableSet<User> = mutableSetOf(),

        @ElementCollection
        var notifications: MutableList<Notification> = mutableListOf(),

        @OneToMany
        var likedPosts: MutableSet<Post> = mutableSetOf(),

        @OneToMany
        var dislikedPosts: MutableSet<Post> = mutableSetOf(),

        @ManyToOne
        var avatar: Media? = null,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
)