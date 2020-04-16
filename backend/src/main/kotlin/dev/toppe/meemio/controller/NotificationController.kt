package dev.toppe.meemio.controller

import dev.toppe.meemio.service.UserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/notifications"])
class NotificationController(
        private val userService: UserService
) {

    @GetMapping
    fun getNotifications() = userService.getNotifications()

    @PostMapping(path = ["/read"])
    fun markAsRead() = userService.markAllAsRead()

}