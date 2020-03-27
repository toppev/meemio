package dev.toppe.meemio.model

import javax.persistence.*

@Entity
data class Post(

        @ManyToOne
        @JoinColumn(nullable = false)
        val user: User,

        @ManyToMany
        var liked: MutableSet<User> = mutableSetOf(),

        @ManyToMany
        var disliked: MutableSet<User> = mutableSetOf(),

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0
)