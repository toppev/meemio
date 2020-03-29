package dev.toppe.meemio.service

import dev.toppe.meemio.NotFoundException
import dev.toppe.meemio.model.Notification
import dev.toppe.meemio.model.NotificationActionType
import dev.toppe.meemio.model.User
import dev.toppe.meemio.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(
        val userRepository: UserRepository
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
    fun getNotifications(user: User = getCurrentUser()): List<Notification> {
        return user.notifications
    }

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
    fun markAllAsRead(user: User = getCurrentUser()) {
        getNotifications(user).forEach { markAsRead(it, user) }
    }

    /**
     * Follow the user and add to their followers
     * @throws NotFoundException (404) if the user was not found
     */
    fun follow(toFollowId: Long, user: User = getCurrentUser()) {
        userRepository.findById(toFollowId).orElseThrow { NotFoundException("user $toFollowId") }.let { toFollow ->
            if (user.following.add(toFollow)) {
                userRepository.save(user)
            }
            if (toFollow.followers.add(user)) {
                addNotification(toFollow, "${user.username} started following you!", NotificationActionType.PROFILE, user.id)
                userRepository.save(toFollow)
            }
        }
    }

    /**
     * Unfollow the user and remove from their followers
     * @throws NotFoundException (404) if the user was not found
     */
    fun unfollow(unfollowId: Long, user: User = getCurrentUser()) {
        userRepository.findById(unfollowId).orElseThrow { NotFoundException("user $unfollowId") }.let { unfollow ->
            if (user.following.remove(unfollow)) {
                userRepository.save(user)
            }
            if (unfollow.followers.remove(user)) {
                userRepository.save(unfollow)
            }
        }
    }

}