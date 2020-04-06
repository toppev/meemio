package dev.toppe.meemio.service

import dev.toppe.meemio.model.Media
import dev.toppe.meemio.model.UploadType
import dev.toppe.meemio.model.User
import dev.toppe.meemio.repository.MediaRepository
import javassist.NotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class MediaService(
        val mediaRepository: MediaRepository,
        val fileStoreService: FileStoreService
) {

    fun readFile(mediaId: Long): ByteArray {
        return fileStoreService.readBytes(mediaId.toString()) ?: throw NotFoundException("media $mediaId")
    }

    fun store(byteArray: ByteArray, uploadType: UploadType?, user: User = getCurrentUser()): Media {
        val media = mediaRepository.save(Media(user, uploadType))
        fileStoreService.storeBytes(media.id.toString(), byteArray)
        return media
    }
}