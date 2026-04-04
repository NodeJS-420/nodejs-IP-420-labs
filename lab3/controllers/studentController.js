class ExampleController {
  static exampleMethod(req, res) {
    try {

    } catch (error) {
      res.status(500).render('error', { error: error.message });
    }
  }
}

module.exports = ExampleController;
