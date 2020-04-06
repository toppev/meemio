package dev.toppe.meemio.service

import dev.toppe.meemio.InvalidUsername
import dev.toppe.meemio.NotFoundException
import dev.toppe.meemio.model.Media
import dev.toppe.meemio.model.Notification
import dev.toppe.meemio.model.NotificationActionType
import dev.toppe.meemio.model.User
import dev.toppe.meemio.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserService(
        val userRepository: UserRepository,
        val passwordEncoder: PasswordEncoder
) {

    /**
     * Add a new notification
     */
    fun addNotification(
            user: User,
            message: String,
            type: NotificationActionType = NotificationActionType.NONE,
            refId: Long = 0
    ) {
        val notification = Notification(message, type, refId)
        user.notifications.add(notification)
        userRepository.save(user)
    }

    /**
     * Get all notifications
     */
    fun getNotifications(user: User = getCurrentUser()) = user.notifications

    /**
     * Mark the given notification as read
     */
    fun markAsRead(notification: Notification, user: User = getCurrentUser()): Boolean {
        if (!notification.hasRead) {
            notification.hasRead = true
            userRepository.save(user)
            return true
        }
        return false
    }

    /**
     * Mark all notification as read
     */
    fun markAllAsRead(user: User = getCurrentUser()) = getNotifications(user).forEach { markAsRead(it, user) }

    /**
     * Follow the user and add to their followers
     * @throws NotFoundException (404) if the user was not found
     */
    fun follow(toFollowId: Long, user: User = userRepository.findById(getCurrentUser().id).get()) {
        val toFollow = userRepository.findById(toFollowId).orElseThrow { NotFoundException("user $toFollowId") }
        if (user.following.add(toFollow)) {
            userRepository.save(user)
        }
        if (toFollow.followers.add(user)) {
            addNotification(toFollow, "${user.username} started following you!", NotificationActionType.PROFILE, user.id)
            userRepository.save(toFollow)
        }
    }

    /**
     * Unfollow the user and remove from their followers
     * @throws NotFoundException (404) if the user was not found
     */
    fun unfollow(unfollowId: Long, user: User = userRepository.findById(getCurrentUser().id).get()) {
        userRepository.findById(unfollowId).orElseThrow { NotFoundException("user $unfollowId") }.let { unfollow ->
            if (user.following.remove(unfollow)) {
                userRepository.save(user)
            }
            if (unfollow.followers.remove(user)) {
                userRepository.save(unfollow)
            }
        }
    }

    fun createAccount(username: String, password: String): User {
        if (userRepository.findByUsername(username) != null) {
            throw InvalidUsername("username taken")
        }
        val user = User(username, passwordEncoder.encode(password))
        return userRepository.save(user)
    }

    fun setAvatar(media: Media, user: User = getCurrentUser()) {
        user.avatar = media
        userRepository.save(user)
    }

}