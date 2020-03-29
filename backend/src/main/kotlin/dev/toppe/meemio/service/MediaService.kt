package dev.toppe.meemio.service

import dev.toppe.meemio.model.Media
import dev.toppe.meemio.model.Post
import dev.toppe.meemio.model.UploadType
import dev.toppe.meemio.model.User
import dev.toppe.meemio.repository.MediaRepository
import dev.toppe.meemio.repository.UserRepository
import javassist.NotFoundException
import org.springframework.stereotype.Service

@Service
class MediaService(
        val mediaRepository: MediaRepository,
        val userRepository: UserRepository,
        val postService: PostService,
        val fileStoreService: FileStoreService
) {

    fun readFile(mediaId: Long): ByteArray {
        return fileStoreService.readBytes(mediaId.toString()) ?: throw NotFoundException("media $mediaId")
    }

    fun store(byteArray: ByteArray, uploadType: UploadType?, user: User = getCurrentUser()) {
        val media = mediaRepository.save(Media(user, uploadType))
        when (uploadType) {
            UploadType.POST -> {
                postService.createPost(Post(user, media = media), user)
            }
            UploadType.AVATAR -> {
                user.avatar = media
                userRepository.save(user)
            }
        }
        fileStoreService.storeBytes(media.id.toString(), byteArray)
    }
}