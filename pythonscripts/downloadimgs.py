#!/Users/thangrove/anaconda3/bin/python

import urllib.request

for n in range(221267, 221294):
    print("\rdownloading {}".format(n), end="")
    imgurl = 'http://idp.bl.uk/image_IDP.a4d?type=loadRotatedMainImage;recnum={};rotate=0;imageType=_M'.format(n)
    urllib.request.urlretrieve(imgurl, "../images/pelliot-116-{}.jpg".format(n))

