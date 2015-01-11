/* global OC, OCA, $, t */
$(document).ready(function () {
		var button;

		if ($('#body-login').length > 0) {
			return true; //deactivate on login page
		}

		function onFileListUpdated () {
			var hasImages = false;
			var files = OCA.Sharing.PublicApp.fileList.files;

			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				if (file.isPreviewAvailable) {
					hasImages = true;
					break;
				}
			}

			button.toggleClass('hidden', !hasImages);
		}

		if ($('#filesApp').val() && $('#isPublic').val()) {

			$('#fileList').on('updated', onFileListUpdated);

			// toggle for opening shared file list as picture view
			// TODO find a way to not need to use inline CSS
			button = $('<div class="button hidden"' +
			'style="position: absolute; right: 0; top: 0; font-weight: normal;">' +
			'<img class="svg" src="' + OC.filePath('core', 'img/actions', 'toggle-pictures.svg') + '"' +
			'alt="' + t('gallery', 'Picture view') + '"' +
			'style="vertical-align: text-top; ' +
			'-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50); ' +
			'filter: alpha(opacity=50); opacity: .5;" />' +
			'</div>');
			button.click(function () {
				window.location.href = OC.generateUrl('apps/galleryplus/public?token={token}', {
					token: $('#sharingToken').val()
				}) + '#' + OCA.Sharing.PublicApp.fileList.getCurrentDirectory().replace(/^\//, '');
			});

			$('#controls').append(button);
		}
	}
);