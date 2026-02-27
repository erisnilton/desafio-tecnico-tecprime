import z from 'zod';

z.config({
  customError(issue) {
    if (issue.code === 'too_big') {
      return `Value is larger than the maximum allowed size of ${issue.maximum}`;
    }

    if (issue.code === 'invalid_type') {
      return `Expected type ${issue.expected}, but received type ${issue.received}`;
    }

    console.log(issue);
  },
});
