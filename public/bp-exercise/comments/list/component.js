function ListController(CommentsService) {
  const vm = this;
  vm.comments = [];
  CommentsService.List().then((comments) => {
    vm.comments = comments;
    recalcAverage(vm);
  });

  vm.onRating = function(comment) {
    if (comment.rating) {
      comment.hasTemporaryRating = false;
    } 

    CommentsService.Update({
      id: comment._id,
      rating: comment.rating
    });

    recalcAverage(this);
  }
}

ListController.$inject = ['CommentsService'];

bpExerciseApp.component('commentsList', {
  controller: ['CommentsService', ListController],
  templateUrl: 'bp-exercise/comments/list/list.html'
});

function recalcAverage(vm) {
  var averageRating = vm.comments.reduce((sum, comment) => {
    if (comment.rating && !comment.hasTemporaryRating) {
      return sum + comment.rating;
    }
    return sum;
  }, 0);
  averageRating = Math.round(averageRating / vm.comments.length);

  vm.comments.forEach((comment) => {
    if (!comment.rating || comment.hasTemporaryRating) {
      comment.hasTemporaryRating = true;
      comment.rating = averageRating;
    }
  });
}