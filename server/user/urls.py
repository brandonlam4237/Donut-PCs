from django.urls import path
from .views import CustomerList
from .views import BlacklistedUserList, BlacklistUser, CustomerDetail
from .views import UserList
from .views import ActivateUser, RejectUser, ProtestRejection
from .views import AddBalance
from .views import CustomerCart, ManageCart, ManageOrders
from .views import GetLatestBuild, MakeBuildVisible, CheckoutBuild

urlpatterns = [
    path('', UserList.as_view()),

    # User Detail Endpoints
    path('customer', CustomerList.as_view()),
    path('customer/<int:id>', CustomerDetail.as_view()),

    # Modify User Endpoints
    path('blacklist', BlacklistedUserList.as_view()),
    path('blacklist/<int:id>', BlacklistUser.as_view()),

    path('activate/<int:id>', ActivateUser.as_view()),
    path('reject/<int:user_id>', RejectUser.as_view()),
    path('protest', ProtestRejection.as_view()),

    path('balance', AddBalance.as_view()),

    # Shopping Cart Endpoints
    path('cart', CustomerCart.as_view()),
    path('cart/<int:id>', ManageCart.as_view()),

    # Order Endpoints
    path('orders', ManageOrders.as_view()),

    # Build Endpoints
    path('builds/latest', GetLatestBuild.as_view()),
    path('builds/visible/<int:id>', MakeBuildVisible.as_view()),
    path('builds/checkout/<int:id>', CheckoutBuild.as_view()),
]
